﻿using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.Models
{
    public class Project
    {
        public int ProjectId { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 4)]
        public string Name { get; set; } = string.Empty;
        public DateTime CreationDate { get; set; }
        public bool? IsDeleted { get; set; }
        public int WorkspaceId { get; set; }
        public Workspace? Workspace { get; set; }
        public ICollection<TimeEntry>? TimeEntries { get; set; }
        /*public ICollection<User>? Users{ get; set; }*/
    }
}
