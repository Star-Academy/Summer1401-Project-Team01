using TalStart.Models.Interfaces;

namespace TalStart.Models;

public class Pipeline
{
    public string Name { get; set; }
    public DataSet Source { get; set; }
    public DataSet Destination{ get; set; }
    public List<IProcess> TreeOfProcesses { get; set; } //*
    public User User { get; set; }
}