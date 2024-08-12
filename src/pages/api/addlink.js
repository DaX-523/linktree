import userModel from "@/model/userModel";
import connectDB from "@/lib/connectDB";
export default async function handler(req, res) {
  try {
    await connectDB();
    const { title, link, status, userId } = req.body;
    console.log("Data getting", title, link, status, userId);
    // Check if the user exists
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    console.log("Data found", user);
    let existingLink = user.links.find((elem) => {
      console.log(link, elem.link, elem.link == link);

      return elem.link == link;
    });
    console.log(existingLink);
    if (!existingLink) {
      // If the link does not exist, push a new link object to the links array
      user.links.push({ title, link, status });
    } else {
      // If the link exists, update its properties
      existingLink.title = title;
      existingLink.status = status;
    }

    // Push new link object to the links array

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Link added successfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
