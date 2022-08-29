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
    Inner = 0,
    Left = 1,
    Right = 2,
    Full = 3
}


/* Example
{
  "middleDatasetName": "arya.covid",
  "type": "INNER",
  "leftVal": "Deaths",
  "rightVal": "Healthy"
}
*/