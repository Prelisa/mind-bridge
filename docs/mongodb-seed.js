// MongoDB Seed Script for MindBridge
// This script creates a test user and some sample posts

// Connect to MongoDB (to run via MongoDB shell)
// mongo "mongodb+srv://prelisadahalbiz:YNRs2fRa2QH2bW76@mind-bridge.ksdpzu3.mongodb.net/mind-bridge"

// Create user collection if it doesn't exist
db.createCollection("users");

// Create a test user
db.users.insertOne({
  name: "Test User",
  email: "test@mindbridge.com",
  password: "password123",
  description: "This is a test user account for MindBridge",
  country: "USA",
  joinedData: new Date().getTime(),
  createdAt: new Date(),
  updatedAt: new Date()
});

// Create posts collection if it doesn't exist
db.createCollection("posts");

// Create sample posts
db.posts.insertMany([
  {
    title: "Welcome to MindBridge",
    thumbnailUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    subTitle: "A brief introduction to our platform",
    body: "<p>Welcome to MindBridge! This platform allows you to share your thoughts and ideas with the world.</p><p>MindBridge is designed to be a simple yet powerful blogging platform where you can create, edit, and manage your content with ease.</p><p>Feel free to explore the features and let us know what you think!</p>",
    keywords: ["welcome", "introduction", "mindbridge"],
    authorEmail: "test@mindbridge.com",
    authorName: "Test User",
    createdTime: new Date().getTime(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "How to Create Great Content",
    thumbnailUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    subTitle: "Tips for creating engaging blog posts",
    body: "<h2>Creating Engaging Content</h2><p>Creating great content starts with understanding your audience. Here are some tips to help you create engaging blog posts:</p><ul><li>Know your target audience</li><li>Choose relevant and interesting topics</li><li>Use clear and concise language</li><li>Include images and multimedia</li><li>Organize your content with headings and subheadings</li><li>End with a strong conclusion</li></ul><p>Remember, the key to great content is providing value to your readers. Focus on quality over quantity!</p>",
    keywords: ["content", "writing", "tips"],
    authorEmail: "test@mindbridge.com",
    authorName: "Test User",
    createdTime: new Date().getTime() - 86400000, // 1 day ago
    createdAt: new Date(new Date().getTime() - 86400000),
    updatedAt: new Date(new Date().getTime() - 86400000)
  },
  {
    title: "The Future of Blogging",
    thumbnailUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    subTitle: "Exploring trends and predictions for the blogging world",
    body: "<p>Blogging has come a long way since its inception in the late 1990s. What started as simple online diaries has evolved into a powerful medium for sharing information, building communities, and even making a living.</p><h3>Key Trends in Blogging</h3><p>Some of the key trends we're seeing in the blogging world include:</p><ol><li>Integration of AI for content creation and optimization</li><li>More multimedia content including videos and podcasts</li><li>Increased focus on niche topics</li><li>Greater emphasis on community building</li><li>Monetization through multiple revenue streams</li></ol><p>As technology continues to evolve, we can expect blogging platforms to become more sophisticated and user-friendly, making it easier than ever for people to share their thoughts and ideas with the world.</p>",
    keywords: ["blogging", "trends", "future", "technology"],
    authorEmail: "test@mindbridge.com",
    authorName: "Test User",
    createdTime: new Date().getTime() - 172800000, // 2 days ago
    createdAt: new Date(new Date().getTime() - 172800000),
    updatedAt: new Date(new Date().getTime() - 172800000)
  }
]);

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.posts.createIndex({ authorEmail: 1 });
db.posts.createIndex({ createdTime: -1 });

// Verify data
print("Users:");
printjson(db.users.find().toArray());

print("Posts:");
printjson(db.posts.find().toArray());

print("Database seed completed successfully!");