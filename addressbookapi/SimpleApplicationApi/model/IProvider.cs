using System;
namespace SimpleApplicationApi.model
{
	public interface IProvider
	{
		public List<Person> GetAll();

		public Person Get(int id);

		public int Delete(int id);

		public int Update(Person person);

		public bool Add(Person person);
	}
}

