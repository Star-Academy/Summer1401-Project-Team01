namespace TalStart.Models;

public class Pipeline
{
    public Pipeline(string name, DataSet source, DataSet destination)
    {
        Name = name;
        Source = source;
        Destination = destination;
    }
    public string Name { get; set; }
    public DataSet Source { get; set; }
    public DataSet Destination{ get; set; }
    public List<Process> TreeOfProcesses { get; set; } //*
}