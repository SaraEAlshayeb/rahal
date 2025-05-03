const { ObjectId } = require("mongodb");
const { client } = require("../config/db");

// Controller for fetching community data
const getCommunityData = async (req, res) => {
    try {
        const db = client.db("RahalDb");
        const communityCollection = db.collection("Community");

        // Fetch all communities from the database
        const communities = await communityCollection.find({}).toArray();

        // Map over the communities and add members count
        const communityData = communities.map(community => {
            return {
                name: community.name,
                img: `./${community.name}.png`, // Assuming image name is the same as the community name
                members: community.members ? community.members.length : 0 // Get the length of the members array
            };
        });

        res.status(200).json(communityData);

    } catch (err) {
        console.error("Error fetching community data:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

// Controller for joining a community
const joinCommunity = async (req, res) => {

    const { userId, communityName } = req.body;

    // Check if both userId and communityName are provided
    if (!userId || !communityName) {
        return res.status(400).json({ message: "User ID and community name are required" });
    }

    try {
        const db = client.db("RahalDb");
        const userCollection = db.collection("user");
        const communityCollection = db.collection("Community");

        const userUpdate = await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $addToSet: { community: communityName } }
        );


        if (userUpdate.modifiedCount === 0) {
            return res.status(400).json({ message: "Failed to add community to user" });
        }


        const communityUpdate = await communityCollection.updateOne(
            { name: communityName },
            { $addToSet: { members: new ObjectId(userId) } }
        );


        if (communityUpdate.modifiedCount === 0) {
            return res.status(400).json({ message: "Failed to add user to community members" });
        }

        res.status(200).json({ message: `Successfully joined ${communityName} community` });
    } catch (err) {
        console.error("Error joining community:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};


const addCommunity = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Community name is required" });

    try {
        const db = client.db("RahalDb");

        const exists = await db.collection("Community").findOne({ name });
        if (exists) return res.status(409).json({ message: "Community already exists" });

        await db.collection("Community").insertOne({
            name,
            imageC: `./${name}.png`,
            description: "",
            members: []
        });

        res.status(201).json({ message: "Community added successfully" });
    } catch (err) {
        console.error("Error adding community:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};
const deleteCommunity = async (req, res) => {
    const { name } = req.params;

    try {
        const db = client.db("RahalDb");
        const result = await db.collection("Community").deleteOne({ name });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Community not found" });
        }

        res.status(200).json({ message: `${name} deleted successfully` });
    } catch (err) {
        console.error("Error deleting community:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

const cleanupOrphanCommunityMembers = async (req, res) => {
    try {
        const db = client.db("RahalDb");

        const validUserIds = await db.collection("user").distinct("_id");

        await db.collection("Community").updateMany(
            {},
            [
                {
                    $set: {
                        members: {
                            $filter: {
                                input: "$members",
                                as: "member",
                                cond: { $in: ["$$member", validUserIds] }
                            }
                        }
                    }
                }
            ]
        );

        res.status(200).json({ message: "Community members cleaned up" });
    } catch (err) {
        console.error("Cleanup error:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

const fixMemberIdFormat = async (req, res) => {
    try {
        const db = client.db("RahalDb");
        const communities = await db.collection("Community").find({}).toArray();

        for (const community of communities) {
            const cleaned = community.members.map(member => {
                try {
                    if (typeof member === 'object' && member._bsontype === "ObjectId") return member;
                    return new ObjectId(JSON.parse(member)?.$oid || member);
                } catch {
                    return null;
                }
            }).filter(Boolean);

            await db.collection("Community").updateOne(
                { _id: community._id },
                { $set: { members: cleaned } }
            );
        }

        res.status(200).json({ message: "Member format cleaned successfully." });
    } catch (err) {
        console.error("Fix format error:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

module.exports = { getCommunityData, joinCommunity, deleteCommunity, addCommunity,cleanupOrphanCommunityMembers ,fixMemberIdFormat};
