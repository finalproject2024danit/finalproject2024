INSERT INTO friends (
    id,
    user_from_id,
    user_to_id,
    created_date,
    last_modified_date
  )
VALUES (
    id:integer,
    'user_from_id:bigint',
    'user_to_id:bigint',
    'created_date:timestamp without time zone',
    'last_modified_date:timestamp without time zone'
  );