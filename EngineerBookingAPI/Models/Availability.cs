using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Availability
{
    public int Id { get; set; }

    [Required]
    public int EngineerId { get; set; }

    [Required]
    public DayOfWeek Day { get; set; }

    [Required]
    public TimeSpan StartTime { get; set; }

    [Required]
    public TimeSpan EndTime { get; set; }

    // Navigation property
    [JsonIgnore] // Prevent circular reference
    public Engineer? Engineer { get; set; }
}
