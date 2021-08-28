var self = module.exports = 
{
  incrementDate : function(date)
  {
    var incrementedDate = new Date(date); 
    incrementedDate.setDate(incrementedDate.getDate() + 1); 
    return incrementedDate;
  },
  timeInAscOrder : function(times)
  {
	  return times.sort(function (a, b) 
	  {
	    return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
	  });
  },
  dateInAscOrder : function(dates)
  {
    return dates.sort(function (a, b) 
    {
      return new Date(b) - new Date(a);
    });
  }
};


