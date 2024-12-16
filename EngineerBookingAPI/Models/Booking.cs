using System;
using System.ComponentModel.DataAnnotations;

public class Booking
{
    public int Id { get; set; }

    [Required]
    public int EngineerId { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public TimeSpan StartTime { get; set; }

    [Required]
    public TimeSpan EndTime { get; set; }

    [Required]
    public string InspectionType { get; set; }

    // Navigation property
    public Engineer? Engineer { get; set; }
}
