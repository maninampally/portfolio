import os
import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/manios")

@contextmanager
def get_db_connection():
    """Get database connection context manager."""
    conn = psycopg2.connect(DATABASE_URL)
    try:
        yield conn
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

def get_db_cursor(conn):
    """Get cursor from connection."""
    return conn.cursor(cursor_factory=RealDictCursor)

def execute_query(query: str, params: tuple = None):
    """Execute query and return results."""
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        cursor.execute(query, params or ())
        return cursor.fetchall()

def execute_single(query: str, params: tuple = None):
    """Execute query and return single row."""
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        cursor.execute(query, params or ())
        return cursor.fetchone()

def execute_insert(query: str, params: tuple = None):
    """Execute insert/update and return affected rows."""
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        cursor.execute(query, params or ())
        return cursor.rowcount
