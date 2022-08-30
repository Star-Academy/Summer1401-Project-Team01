﻿namespace TalStart.Models.Interfaces
{
    public interface IProcess
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public Object? Options { get; set; }
        public bool Run(string sourceTable, string finalTable );
    }
}
