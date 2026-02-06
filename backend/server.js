// backend/server.js
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// Enable CORS so frontend can connect
fastify.register(cors, { origin: "*" });

// Root route
fastify.get('/', async (request, reply) => {
  return { message: 'Backend is running!' };
});

// Jobs route (mock data)
fastify.get('/jobs', async (request, reply) => {
  return [
    { id: 1, title: "React Developer", company: "ABC Corp", location: "Remote", description: "Frontend role building UI components", type: "Full-time" },
    { id: 2, title: "ML Engineer", company: "XYZ Ltd", location: "Hyderabad", description: "AI/ML role focusing on model deployment", type: "Contract" },
    { id: 3, title: "Backend Developer", company: "Tech Solutions", location: "Bangalore", description: "Work with Node.js and databases", type: "Full-time" },
    { id: 4, title: "Data Analyst", company: "DataWorks", location: "Pune", description: "Analyze datasets and create dashboards", type: "Internship" },
    { id: 5, title: "DevOps Engineer", company: "CloudNet", location: "Remote", description: "Manage CI/CD pipelines and cloud infra", type: "Full-time" },
    { id: 6, title: "UI/UX Designer", company: "DesignHub", location: "Mumbai", description: "Design user-friendly interfaces", type: "Part-time" },
    { id: 7, title: "Cybersecurity Specialist", company: "SecureIT", location: "Delhi", description: "Monitor and secure systems", type: "Full-time" },
    { id: 8, title: "AI Research Intern", company: "InnovateAI", location: "Hyderabad", description: "Assist in research on deep learning", type: "Internship" }
  ];
});

// Start server
fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
