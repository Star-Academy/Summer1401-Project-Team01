﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TalStart.Models;

#nullable disable

namespace TalStart.Migrations
{
    [DbContext(typeof(TalStartContext))]
    [Migration("20220822081645_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("TalStart.Models.DataSet", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Name");

                    b.HasIndex("UserName");

                    b.ToTable("DataSet");
                });

            modelBuilder.Entity("TalStart.Models.PipelineDbo", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("JSON")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Name");

                    b.HasIndex("UserName");

                    b.ToTable("Pipelines");
                });

            modelBuilder.Entity("TalStart.Models.User", b =>
                {
                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("UserName");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("TalStart.Models.DataSet", b =>
                {
                    b.HasOne("TalStart.Models.User", "User")
                        .WithMany("ListOfDataSets")
                        .HasForeignKey("UserName");

                    b.Navigation("User");
                });

            modelBuilder.Entity("TalStart.Models.PipelineDbo", b =>
                {
                    b.HasOne("TalStart.Models.User", "User")
                        .WithMany("ListOfPipelines")
                        .HasForeignKey("UserName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("TalStart.Models.User", b =>
                {
                    b.Navigation("ListOfDataSets");

                    b.Navigation("ListOfPipelines");
                });
#pragma warning restore 612, 618
        }
    }
}