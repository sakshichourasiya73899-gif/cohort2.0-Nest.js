import dns from 'dns';
import dotenv from 'dotenv';

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

// dotenv.config() MUST run before app.js is imported
// because connectDB() inside app.js needs process.env.MONGOURI
dotenv.config();

// Dynamic import runs AFTER the code above — so MONGOURI is available ✅
const { default: app } = await import("./src/app.js");

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

