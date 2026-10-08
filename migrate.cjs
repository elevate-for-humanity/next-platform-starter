const { Client } = require('pg');

const client = new Client({
  host: 'db.cuxzzpsyufcewtmicszk.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'kingGreene08$$$',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000,
});

async function main() {
  try {
    console.info('🔌 Connecting to Supabase PostgreSQL...');
    await client.connect();
    console.info('✅ Connected!\n');

    // Check for schema_migrations table
    console.info('📊 Checking schema_migrations table...');
    const migrationsResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%migration%'
    `);
    
    if (migrationsResult.rows.length === 0) {
      console.info('⚠️  No schema_migrations table found. Will run all migrations.');
    } else {
      console.info(`✅ Found: ${migrationsResult.rows.map(r => r.table_name).join(', ')}`);
    }

    // Check Supabase migrations
    console.info('\n📋 Checking Supabase schema_migrations...');
    const supabaseMigrations = await client.query(`
      SELECT version, executed_at 
      FROM schema_migrations 
      ORDER BY version
    `).catch(() => ({ rows: [] }));
    
    console.info(`Found ${supabaseMigrations.rows.length} migrations already executed:`);
    supabaseMigrations.rows.forEach(r => {
      console.info(`  - ${r.version} (${r.executed_at})`);
    });

    // Check for elevatemigrations table
    console.info('\n📋 Checking for Elevate migrations table...');
    const elevateMigrations = await client.query(`
      SELECT version, applied_at 
      FROM elevatemigrations 
      ORDER BY version
    `).catch(() => ({ rows: [] }));
    
    if (elevateMigrations.rows.length > 0) {
      console.info(`Found ${elevateMigrations.rows.length} Elevate migrations:`);
      elevateMigrations.rows.forEach(r => {
        console.info(`  - ${r.version}`);
      });
    } else {
      console.info('⚠️  No elevatemigrations table or empty');
    }

    // Check key tables exist
    console.info('\n📊 Checking key tables...');
    const tables = ['programs', 'program_enrollments', 'profiles', 'lms_courses'];
    for (const table of tables) {
      const result = await client.query(`
        SELECT COUNT(*) as count FROM ${table} LIMIT 1
      `).catch(e => ({ rows: [{ count: `ERROR: ${e.message}` }] }));
      console.info(`  ${table}: ${result.rows[0].count} rows`);
    }

    console.info('\n✅ Audit complete!');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
