select l.list_id, l.name, l.description from trip_lists as tl
join lists as l on l.list_id = tl.list_id
where tl.trip_id = ${trip_id};
