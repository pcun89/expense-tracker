using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Data;
using ExpenseTracker.Models;

namespace ExpenseTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpenseController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> getExpenses()
        {
            return await _context.Expenses.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> getExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);

            if (expense == null)
                return NotFound();

            return expense;
        }

        [HttpPost]
        public async Task<ActionResult<Expense>> createExpense(Expense expense)
        {
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(getExpense), new { id = expense.Id }, expense);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> updateExpense(int id, Expense expense)
        {
            if (id != expense.Id)
                return BadRequest();

            _context.Entry(expense).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);

            if (expense == null)
                return NotFound();

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
