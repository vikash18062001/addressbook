using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Person")]
public class Person
{
    [Key]
    public int ID { get; set; }

    public string Name { get; set; }

    public string Email { get; set; }

    public string Mobile { get; set; }

    public string Landline { get; set; }

    public string Website { get; set; }

    public string Address { get; set; }

    public Person()
    {
        this.Name = string.Empty;

        this.Email = string.Empty;

        this.Mobile = string.Empty;

        this.Address = string.Empty;

        this.Landline = string.Empty;

        this.Website = string.Empty;
    }
}