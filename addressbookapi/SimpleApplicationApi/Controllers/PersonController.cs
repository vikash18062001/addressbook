using Microsoft.AspNetCore.Mvc;
using SimpleApplicationApi.model;

[ApiController]
[Route("api")]
public class CRUDController : ControllerBase
{
    private readonly IProvider _provider;
    public CRUDController(IProvider provider)
    {
        this._provider = provider;
    }

    [HttpGet]
    public List<Person> Get()
    {
        return this._provider.GetAll();
    }

    [HttpGet]
    [Route("{id}")]
    public Person Get([FromRoute] int id)
    {
        return this._provider.Get(id);
    }

    [HttpPost]
    public bool Add([FromBody] Person person)
    {
        return this._provider.Add(person);
    }

    [HttpDelete]
    [Route("{id}")]
    public int Delete([FromRoute] int id)
    {
        return this._provider.Delete(id);
    }

    [HttpPut]
    public int Update(Person person)
    {
        return this._provider.Update(person);
    }
}