using TalStart.Models.Enums;

namespace TalStart.Models;

public class Row
{
    private string columnName { get; set; }
    private DataType _datatype { get; set; }
    private int length { get; set; }
}