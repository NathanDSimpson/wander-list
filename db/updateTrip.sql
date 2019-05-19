update trips
   set 
        name = ${name},
        description = ${description}
 where trip_id = $(trip_id);