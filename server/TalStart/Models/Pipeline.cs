namespace TalStart.Models;

public class Pipeline
{
    public string Name { get; set; }
    public Dataset Source { get; set; }
    public Dataset Destination{ get; set; }
    public List<Process> TreeOfProcesses { get; set; } //*
    public User User { get; set; }
}