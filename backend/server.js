const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// Enable CORS so frontend can call backend
fastify.register(cors, { origin: '*' });

// Mock job data
const jobs = [
  { id: 1, title: 'Backend Developer', company: 'TechCorp', description: 'Work on APIs and databases.' },
  { id: 2, title: 'Frontend Developer', company: 'WebWorks', description: 'Build UI components in React.' },
  { id: 3, title: 'AI Engineer', company: 'SmartAI', description: 'Develop ML models and pipelines.' }
];

// Route to get jobs
fastify.get('/jobs', async () => jobs);

// Start server
const start = async () => {
  try {
    // Use Render’s assigned port or fallback to 3001
    await fastify.listen({ port: process.env.PORT || 3001, host: '0.0.0.0' });
    fastify.log.info(`Server running at http://0.0.0.0:${process.env.PORT || 3001}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
