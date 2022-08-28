using System.Text;

namespace TalStart.Models.ProcessType.Options;

public class FilterOptions
{
    public List<FilterParam> parameters { get; set; }
    public bool AND { get; set; }

    public override string ToString()
    {
        var query = new StringBuilder();
        foreach (var param in parameters)
        {
            query.Append(param.ToString() + (AND ? "AND" : "OR") + "\n");
        }

        return query.ToString();
    }
}

public class FilterParam
{
    public string columnName { get; set; }
    public string @operator { get; set; }
    public string value { get; set; }

    public override string ToString()
    {
        return $"{columnName} {@operator} {value}";
    }
}