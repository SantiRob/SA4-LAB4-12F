/**
 * Request logging middleware that outputs exclusively to stdout.
 * Formats: [ISO timestamp] METHOD PATH STATUS DURATION
 */
function requestLogger(req, res, next) {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl || req.url} ${res.statusCode} ${duration}ms`);
  });

  next();
}

module.exports = requestLogger;
