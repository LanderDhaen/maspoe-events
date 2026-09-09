import { Kysely, sql } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const up = async (db: Kysely<any>) => {
  await sql`
  create function point_as_json(pt point) returns jsonb as $$
    select jsonb_build_object('x', pt[0], 'y', pt[1]);
  $$ language sql immutable strict parallel safe;
  create function path_as_json(p path) returns jsonb as $$
    select coalesce(
      (
        select jsonb_agg(
          jsonb_build_object('x', m[1]::float8, 'y', m[2]::float8)
          order by ord
        )
        from regexp_matches(p::text, '\\(([^(),]+),([^()]+)\\)', 'g')
          with ordinality as u(m, ord)
      ),
      '[]'::jsonb
    );
  $$ language sql immutable strict parallel safe;
  `.execute(db)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const down = async (db: Kysely<any>) => {
  await sql`
    drop function if exists path_as_json(path);
    drop function if exists point_as_json(point);
  `.execute(db)
}
