namespace TalStart.Models.ProcessType.Options;

public class JoinOptions
{
    public string middleDatasetName { get; set; }

    // INNER, LEFT, RIGHT, OUTER
    public string type { get; set; }
    public string leftVal { get; set; }
    public string rightVal { get; set; }
    
}

public enum JoinType
{
    Inner,
    Left,
    Right,
    Full
}


/* Example
{
  "middleDatasetName": "arya.covid",
  "type": "INNER",
  "leftVal": "Deaths",
  "rightVal": "Healthy"
}
*/