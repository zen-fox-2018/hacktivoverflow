var objs = [ 
    { first_nom: 'Lazslo',last_nom: 'Jamf' },
    { first_nom: 'Pig', last_nom: 'Bodine'  },
    { first_nom: 'Pirate', last_nom: 'Prentice' }
  ];
  
  var sortedObjs = _.sortBy( objs, 'first_nom' );
  
  console.log(sortedObjs)