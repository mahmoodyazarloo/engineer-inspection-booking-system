using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Engineer
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, ErrorMessage = "Name length cannot exceed 100 characters")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address format")]
    public string Email { get; set; }

    // Navigation property
    public ICollection<Availability>? Availabilities { get; set; }
}
