namespace RealEstateServer.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class PropertyBindingModels : DbContext
    {
        public PropertyBindingModels()
            : base("DefaultConnection")
        {
        }

        public virtual DbSet<Property> Properties { get; set; }
        public virtual DbSet<PropertyPicture> PropertyPictures { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Property>()
                .Property(e => e.Status)
                .IsFixedLength();

            modelBuilder.Entity<Property>()
                .Property(e => e.Size)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Property>()
                .Property(e => e.Price)
                .HasPrecision(18, 0);
        }
    }
}
