using System.Data;

namespace TalStart.Models.Interfaces;

public interface ITransformer
{
    public DataTable Transform(DataTable table);
}