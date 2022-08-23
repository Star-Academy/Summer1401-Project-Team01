using TalStart.Models.Interfaces;

namespace TalStart.Models.ProcessType
{
    public class FooProcess : IProcess
    {
        public string Name { get; set; }

        public bool Run()
        {
            return true;
        }
    }
}
