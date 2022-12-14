using DataGate.IServices;
using DataGate.IServices.IParserService;
using DataGate.Services;
using DataGate.Services.ParserService;

var builder = WebApplication.CreateBuilder(args);

var allowCors = "allowCores";

// Add services to the container.
builder.Services.AddTransient<IPipelineService, PipelineService>();
builder.Services.AddTransient<IDatasetService, DatasetService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<ISqlService, SqlService>();
builder.Services.AddTransient<IQueryBuilder, PostgresQueryBuilder>();
builder.Services.AddTransient<IScenarioService, ScenarioService>(x =>
    new ScenarioService(x.GetRequiredService<IDatasetService>(),x.GetRequiredService<IQueryBuilder>()));
builder.Services.AddTransient<IParser>(x => new Parser(x.GetRequiredService<IQueryBuilder>()
    , x.GetRequiredService<ISqlService>()));
builder.Services.AddTransient<IFileService>(x => new FileService(x.GetRequiredService<IParser>()));
builder.Services.AddTransient<IDatasetService>(x => new DatasetService(x.GetRequiredService<IParser>(),
    x.GetRequiredService<IQueryBuilder>(), x.GetRequiredService<IFileService>()));
//builder.Services.AddScoped<FooProcess>(x => new FooProcess(x.GetRequiredService<SqlService>()));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowCors,
        policy => { policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(allowCors);

app.UseAuthorization();

app.MapControllers();

app.Run();