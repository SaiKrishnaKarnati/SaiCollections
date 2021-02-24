using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistance
{
    public class Seedcategory
    {
        public static async Task SeedData(Datacontext context)
        {
            if (context.CategoryList.Any()) return;
            var CategoryList = new List<CategoryList>
             {
                  new CategoryList{
                      Cname = "Sarees"
                  },
                  new CategoryList{
                      Cname="Kurtas"
                  },
                  new CategoryList{
                      Cname="Kurtasets"
                  },
                  new CategoryList{
                      Cname="KurtaPlazzoos"
                  },
                  new CategoryList{
                      Cname="Lehanga"
                  },
                  new CategoryList{
                      Cname="Tops"
                  }
            };
            await context.CategoryList.AddRangeAsync(CategoryList);
            await context.SaveChangesAsync();


        }
    }
}