using TalStart.IServices;
using TalStart.IServices.IParserService;
using TalStart.Services;
using TalStart.Services.ParserService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddTransient<IPipelineService, PipelineService>();
builder.Services.AddTransient<IDatasetService, DatasetService>();
builder.Services.AddTransient<IUserService, UserService>();
//builder.Services.AddTransient<ISqlService, SqlService>();
builder.Services.AddTransient<IQueryBuilder, QueryBuilder>();
builder.Services.AddTransient<IScenarioService, ScenarioService>();
builder.Services.AddTransient<IParser>(x => new Parser(x.GetRequiredService<IQueryBuilder>()));
builder.Services.AddTransient<IFileService>(x => new FileService(x.GetRequiredService<IParser>()));
builder.Services.AddTransient<IDatasetService>(x => new DatasetService(x.GetRequiredService<IParser>()));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();