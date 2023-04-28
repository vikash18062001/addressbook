using System;
using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Data.SqlClient;
using SimpleApplicationApi.model;

namespace SimpleApplicationApi.Provider
{
	public class Provider : IProvider
	{
		private readonly IConfiguration _configuration;

		public Provider (IConfiguration configuration)
		{
			this._configuration = configuration;
		}

		public List<Person> GetAll()
		{
			List<Person> allPerson = new List<Person>();
			using (var connection = new SqlConnection(this._configuration.GetConnectionString("ConnectionString")))
			{
				allPerson = connection.Query<Person>("Select * from Person").ToList() ;
			}
			return allPerson;
		}

		public Person Get(int id)
		{
			Person person = new Person();
			try
			{
				using (var conn = new SqlConnection(this._configuration.GetConnectionString("ConnectionString")))
				{
					return conn.QuerySingleOrDefault<Person>("Select * from Person where ID=@Id", new { Id = id });
				}
			}
			catch (Exception ex)
			{
				return person;
			}
		}

        public bool Add(Person person)
        {
			try
			{
				using (var conn = new SqlConnection(this._configuration.GetConnectionString("ConnectionString")))
				{
					conn.Execute("Insert into Person (Name,Email,Address,Mobile,Landline,Website) values (@name,@email,@address,@mobile,@landline,@website)", new { name = person.Name, email = person.Email, address = person.Address, mobile = person.Mobile, landline = person.Landline, website = person.Website});
				}
				return true;
			}
			catch(Exception ex)
			{

				return false;
			}
        }

        public int Delete(int id)
		{
			try
			{
				using (var conn = new SqlConnection(this._configuration.GetConnectionString("ConnectionString")))
				{
					conn.Delete<Person>(new Person { ID = id });
				}
				return id;
			}
			catch(Exception ex)
			{
				return 0;
			}
		}

        public int Update(Person person)
        {
			try
			{
				using (var conn = new SqlConnection(this._configuration.GetConnectionString("ConnectionString")))
				{
					conn.Update<Person>(person);
				}

				return person.ID;
			}
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}

