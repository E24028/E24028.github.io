function getRandom(min, max)
{
  var Random = Math.random() * (max - min + 1);
  var shori = Random + min;
  return(Math.floor(shori));
}
