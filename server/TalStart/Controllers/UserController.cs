using Microsoft.AspNetCore.Mvc;
using TalStart.IServices;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult AddUser([FromForm] string firstName, [FromForm] string lastName, [FromForm] string username, [FromForm] string email, [FromForm] string password)
    {
        try
        {
            _userService.CreateUser(firstName, lastName, username, email, password);
            return new OkResult();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }
}