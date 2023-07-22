﻿using System.ComponentModel.DataAnnotations;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.ValidationAttributes;

namespace TogglTrackCloneApi.DTOs.TimeEntry
{
    public class TimeEntryDTO
    {
/*        [Required]*/
        [StringLength(255, MinimumLength = 0, ErrorMessage = "description must be between 0 and 255 characters long")]
        public string Description { get; set; } = string.Empty;
        [Required]
        public int Duration { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        public DateTime? StopDate { get; set; } = null;
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Invalid workspace id")]
        public int WorkspaceId { get; set; }
        public int? ProjectId { get; set; } = null;
        [Required]
        [ValidateIdList(ErrorMessage = "Tag name list is invalid")]
        public ICollection<string> Tags { get; set; } = new List<string>();
    }
}
