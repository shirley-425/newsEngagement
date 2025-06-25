const XLSX = require('xlsx');

// Function to determine social engagement level
const getSocialEngagement = (likes, comments, reposts) => {
    // Calculate total engagement
    const totalEngagement = likes + comments * 2 + reposts * 3; // Weighted calculation
    // Threshold for high engagement (can be adjusted)
    return totalEngagement > 5000 ? 'high' : 'low';
};

// Sample data with different types of posts
const samplePosts = [
    {
        id: "t1",
        authorName: "Science Today",
        authorHandle: "@sciencetoday",
        isVerified: true,
        content: "New study shows that regular exercise can improve brain function by up to 20%. Research conducted across 1000 participants over 2 years. 🧠💪 #Neuroscience",
        isTrue: true,
        topic: "health",
        mediaUrl: "https://picsum.photos/600/400?random=1",
        warningType: null,
        analyticalWarning: null,
        emotionalWarning: null,
        likes: 1523,
        comments: 234,
        reposts: 567,
        timestamp: "2h",
        socialEngagement: "low" // Will be calculated
    },
    {
        id: "f1",
        authorName: "Health News Daily",
        authorHandle: "@healthnews",
        isVerified: false,
        content: "BREAKING: Miracle fruit discovered in Amazon rainforest cures all diseases overnight! Scientists baffled by its power! 🍎✨ #MiracleCure",
        isTrue: false,
        topic: "health",
        mediaUrl: "https://picsum.photos/600/400?random=2",
        warningType: "analytical",
        analyticalWarning: "This claim lacks scientific evidence and has not been verified by medical experts. No single treatment can cure all diseases.",
        emotionalWarning: null,
        likes: 15432,
        comments: 2876,
        reposts: 5345,
        timestamp: "5h",
        socialEngagement: "high" // Will be calculated
    },
    {
        id: "t2",
        authorName: "Climate Watch",
        authorHandle: "@climatewatch",
        isVerified: true,
        content: "Latest data shows global temperatures have risen by 1.1°C since pre-industrial times. Here's what this means for our future 🌡️🌍 #ClimateChange",
        isTrue: true,
        topic: "science",
        mediaUrl: "https://picsum.photos/600/400?random=3",
        warningType: null,
        analyticalWarning: null,
        emotionalWarning: null,
        likes: 12876,
        comments: 1543,
        reposts: 2987,
        timestamp: "1d",
        socialEngagement: "high" // Will be calculated
    },
    {
        id: "f2",
        authorName: "Viral Truth",
        authorHandle: "@viraltruth",
        isVerified: false,
        content: "SHOCKING: Government hiding evidence of alien contact! Secret documents reveal decades of cover-ups! 👽🛸 #Aliens #Conspiracy",
        isTrue: false,
        topic: "science",
        mediaUrl: "https://picsum.photos/600/400?random=4",
        warningType: "emotional",
        analyticalWarning: null,
        emotionalWarning: "Warning! This post contains unverified claims that may cause unnecessary panic or confusion.",
        likes: 18765,
        comments: 3432,
        reposts: 6456,
        timestamp: "3h",
        socialEngagement: "high" // Will be calculated
    },
    {
        id: "t3",
        authorName: "Tech Insider",
        authorHandle: "@techinsider",
        isVerified: true,
        content: "New AI model achieves breakthrough in protein folding prediction, potentially revolutionizing drug discovery. Read the peer-reviewed study here: [link] 🧬🤖",
        isTrue: true,
        topic: "technology",
        mediaUrl: "https://picsum.photos/600/400?random=5",
        warningType: null,
        analyticalWarning: null,
        emotionalWarning: null,
        likes: 3456,
        comments: 654,
        reposts: 1234,
        timestamp: "4h",
        socialEngagement: "low" // Will be calculated
    },
    {
        id: "f3",
        authorName: "Tech Buzz",
        authorHandle: "@techbuzz",
        isVerified: false,
        content: "LEAKED: New smartphone battery technology charges in 5 seconds and lasts a month! Industry experts stunned! 🔋⚡️ #TechRevolution",
        isTrue: false,
        topic: "technology",
        mediaUrl: "https://picsum.photos/600/400?random=6",
        warningType: "analytical",
        analyticalWarning: "This claim is technically impossible with current battery technology. No verified research supports these capabilities.",
        emotionalWarning: null,
        likes: 2345,
        comments: 432,
        reposts: 876,
        timestamp: "6h",
        socialEngagement: "low" // Will be calculated
    }
];

// Calculate social engagement for each post
const postsWithEngagement = samplePosts.map(post => ({
    ...post,
    socialEngagement: getSocialEngagement(post.likes, post.comments, post.reposts)
}));

// Create a new workbook
const workbook = XLSX.utils.book_new();

// Convert data to worksheet
const worksheet = XLSX.utils.json_to_sheet(postsWithEngagement);

// Add worksheet to workbook
XLSX.utils.book_append_sheet(workbook, worksheet, "Posts");

// Write to file
XLSX.writeFile(workbook, "sample_posts.xlsx");

console.log("Sample Excel file 'sample_posts.xlsx' has been created with social engagement categories!"); 