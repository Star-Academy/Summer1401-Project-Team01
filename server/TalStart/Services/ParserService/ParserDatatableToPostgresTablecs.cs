using System.Data;
using Npgsql;

namespace TalStart.Services.ParserService;

public static class ParserDatatableToPostgresTable
{
    public static void ParseToPostgresTable(DataTable dataTable)
    {
        var connectionString = "Server=local;Port=5432;Database=postgres;User Id=postgres;Password=basilisk79";
        using var con = new NpgsqlConnection(connectionString);
        con.Open();
        var createTableQuery = dataTable.Columns.Cast<DataColumn>().Aggregate("CREATE TABLE testTable (" + "Id int,", (current, item) => current + $"{item.ColumnName} varchar(255), \n");

        createTableQuery += " PRIMARY KEY (Id));";

        using var createTableCommand = new NpgsqlCommand(createTableQuery, con);
        createTableCommand.ExecuteScalar();


        var insertIntoTableQuery = "INSERT INTO testTable VALUES";
        var counter = 0;
        foreach (DataRow row in dataTable.Rows)
        {
            insertIntoTableQuery += "(";
            insertIntoTableQuery += $"{counter},";
            counter++;
            insertIntoTableQuery = (from DataColumn item in dataTable.Columns select row[item.ColumnName].ToString() == "" ? "NULL" : row[item.ColumnName].ToString()).Aggregate(insertIntoTableQuery, (current, t) => current + $"'{t}' ,");
            insertIntoTableQuery = insertIntoTableQuery.Substring(0, insertIntoTableQuery.Length - 1);
            insertIntoTableQuery += "),";

        }
        insertIntoTableQuery = insertIntoTableQuery.Substring(0, insertIntoTableQuery.Length - 1);
        insertIntoTableQuery += ";";

        using var insertIntoTableCommand = new NpgsqlCommand(insertIntoTableQuery, con);
        insertIntoTableCommand.ExecuteScalar();

    }
}