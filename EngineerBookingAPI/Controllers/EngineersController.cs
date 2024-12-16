using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class EngineersController : ControllerBase
{
    private readonly AppDbContext _context;

    public EngineersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Engineer>>> GetEngineers()
    {
        return await _context.Engineers.Include(e => e.Availabilities).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Engineer>> GetEngineer(int id)
    {
        var engineer = await _context.Engineers
            .Include(e => e.Availabilities)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (engineer == null)
        {
            return NotFound();
        }

        return engineer;
    }

    [HttpPost]
    public async Task<ActionResult<Engineer>> CreateEngineer(Engineer engineer)
    {
        if (engineer.Availabilities == null)
        {
            engineer.Availabilities = new List<Availability>(); // Ensure empty list if null
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Engineers.Add(engineer);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEngineer), new { id = engineer.Id }, engineer);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEngineer(int id, Engineer engineer)
    {
        if (id != engineer.Id)
        {
            return BadRequest();
        }

        _context.Entry(engineer).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Engineers.Any(e => e.Id == id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEngineer(int id)
    {
        var engineer = await _context.Engineers.FindAsync(id);
        if (engineer == null)
        {
            return NotFound();
        }

        _context.Engineers.Remove(engineer);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{id}/availability")]
    public async Task<ActionResult<Availability>> AddAvailability(int id, [FromBody] Availability availability)
    {
        Console.WriteLine($"Received Payload: Day={availability.Day}, StartTime={availability.StartTime}, EndTime={availability.EndTime}");

        if (!ModelState.IsValid)
        {
            foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
            {
                Console.WriteLine($"Validation Error: {error.ErrorMessage}");
            }
            return BadRequest(ModelState);
        }

        var engineer = await _context.Engineers.FindAsync(id);
        if (engineer == null)
        {
            return NotFound(new { message = "Engineer not found" });
        }

        availability.EngineerId = id;
        _context.Availabilities.Add(availability);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEngineer), new { id = engineer.Id }, availability);
    }



}
