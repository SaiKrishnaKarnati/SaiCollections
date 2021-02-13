using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
namespace Persistance
{
    public class Seed
    {
        public static async Task SeedData(Datacontext context)
        {
            if (context.Posts.Any()) return;
            var Posts = new List<Post>
            {
                new Post{
                    DisplayName="Chitrarekha Alluring Women Kurta Sets",
                    Description=@"Catalog Name:Chitrarekha Alluring Women Kurta Sets
Kurta Fabric: Rayon Slub
Bottomwear Fabric: Rayon Slub
Fabric: Rayon Slub
Set Type: Variable (Product Dependent)
Bottom Type: Variable (Product Dependent)
Sizes: 
XL, L, XXL, MDispatch: 2-3 Days
Easy Returns Available In Case Of Any Issue
Price 700to999+free shipping
Cash on delivery available",
Image=null,
Sizes="XL, L,XXL,M"
                },
                new Post{
                    DisplayName="Alisha Ensemble Women Lehenga",
                    Image=null,
                    Description=@"Catalog Name:Alisha Ensemble Women Lehenga
Topwear Fabric: Silk Blend
Bottomwear Fabric: Silk Blend
Dupatta Fabric: Silk Blend
Set type: Choli And Dupatta
Top Print or Pattern Type: Mirror Work
Bottom Print or Pattern Type: Jacquard
Dupatta Print or Pattern Type: Jacquard
Sizes: 
Semi Stitched,Un Stitched,Free Size (Lehenga Waist Size: 42 in, Lehenga Length Size: 42 in, Duppatta Length Size: 2.2 m) 

Dispatch: 2-3 Days
Easy Returns Available In Case Of Any Issue
Price 1499+free shipping
Cash on delivery available",
Sizes="SemiStitched, UnStitched, FreeSize"
                }

            };

            await context.Posts.AddRangeAsync(Posts);
            await context.SaveChangesAsync();
        }
    }
}