namespace TalStart.Models.Interfaces
{
    public interface IProcess
    {
        public string Name { get; set; }
        public bool Run();
    }
}
