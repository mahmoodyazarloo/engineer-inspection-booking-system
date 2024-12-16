using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Engineer> Engineers { get; set; }
    public DbSet<Availability> Availabilities { get; set; }
    public DbSet<Booking> Bookings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Engineer>()
            .HasMany(e => e.Availabilities)
            .WithOne(a => a.Engineer)
            .HasForeignKey(a => a.EngineerId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Availability>()
            .Property(a => a.StartTime)
            .IsRequired();

        modelBuilder.Entity<Availability>()
            .Property(a => a.EndTime)
            .IsRequired();
    }
}
