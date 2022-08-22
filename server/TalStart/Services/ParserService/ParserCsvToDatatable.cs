using System.Data;
using IronXL;

namespace TalStart.Services.ParserService;

public static class ParserCsvToDatatable
{
    public static DataTable Parse(string filePath)
    {
        WorkBook workbook = WorkBook.LoadCSV(filePath, fileFormat: ExcelFileFormat.XLSX, ListDelimiter: ",");
        WorkSheet ws = workbook.DefaultWorkSheet;
        return ws.ToDataTable(true);
    }
}