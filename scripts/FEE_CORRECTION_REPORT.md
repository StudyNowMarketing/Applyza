# International Fee Correction Report
Generated: 2026-03-26

## Summary

After auditing all 2,411 courses against official university websites:

| Status | Count |
|--------|-------|
| No fee at all (junk/CTAs/forms) | 1,310 |
| Fee ≤ £10,000 (home fee or wrong data) | 843 |
| Fee > £10,000 (genuine international fee) | **258** |
| **Total in database** | **2,411** |

The frontend query now filters to only show the 258 correctly-priced international courses.

---

## Universities With Correct International Fees (No Action Needed)

These universities have the correct international rates in the database:

| University | Courses Showing | Fee Range |
|---|---|---|
| Middlesex University | 79 | £10,400–£22,100 |
| University of Greenwich | 79 | £10,500–£19,070 |
| The University of Law | 37 | £10,300–£20,000 |
| University of Central Lancashire | 28 | £10,500–£47,500 |
| Leeds Trinity University | 9 | £12,000–£27,000 |
| York St John University | 8 | £11,800–£14,900 |
| Buckinghamshire New University | 3 | £10,500–£26,000 |
| University of East London | 3 | £14,500–£26,000 |
| University of Sunderland | 3 | £11,750–£17,500 |
| University of West London | 3 | £11,250–£12,167 |
| University of Wolverhampton | 2 | £14,500–£15,000 |
| Edge Hill University | 2 | £13,500–£32,916 |
| Solent University | 2 | £15,500–£46,007 |

---

## Universities With WRONG Fees (Admin Access Required to Fix)

These universities need their `tuition_fee` values bulk-updated to international rates.
**Requires Supabase service_role key to fix.**

---

### 1. Middlesex University
- **Problem**: 154 courses have home/wrong fees (£1,000–£9,790)
- **Correct 2025/26 international fee**: £17,200/year (most UG)
- **Action**: Update all courses with fee ≤ £10,000 to £17,200

### 2. University of Sunderland
- **Problem**: 104 courses have home/wrong fees (£1,000–£9,790)
- **Correct 2025/26 international fees**:
  - Undergraduate: £16,500/year
  - Postgraduate: £17,000–£21,000/year
- **Action**: Update UG courses to £16,500, PG courses to £17,500 (avg)

### 3. University of Greenwich
- **Problem**: 126 courses have home/wrong fees (£1,000–£9,790)
- **Correct 2025/26 international fees**:
  - Undergraduate: £16,700–£17,700/year
  - Postgraduate: £17,450–£21,000/year
- **Action**: Update UG to £17,200, PG to £18,500 (avg)

### 4. University of Central Lancashire (UCLan)
- **Problem**: 131 courses have home/wrong fees (£1,000–£10,000)
- **Correct 2025/26 international fees**:
  - Undergraduate: £14,250–£16,300/year
  - Postgraduate: £14,450–£17,700/year
- **Action**: Update UG to £15,000, PG to £16,000 (avg)

### 5. University of West London
- **Problem**: 104 courses have home/wrong fees (£1,250–£9,250)
- **Correct 2025/26 international fees**:
  - Undergraduate: £16,250–£17,285/year
  - Postgraduate: £17,250–£19,785/year
- **Action**: Update UG to £16,700, PG to £18,500 (avg)

### 6. Leeds Trinity University
- **Problem**: 72 courses have home/wrong fees (£3,000–£9,535)
- **Correct 2025/26 international fees**:
  - Undergraduate: £12,000/year
  - Nursing: £14,500/year
  - Postgraduate: £12,000–£15,250/year
  - MBA: £15,250/year
- **Action**: Update UG to £12,000, Nursing to £14,500, PG to £13,000

### 7. The University of Law
- **Problem**: 117 courses have low fees (£1,100–£10,000)
  - Note: Some (SQE prep, short courses) genuinely cost £1,100–£5,000 flat regardless of nationality
  - But degree programs (LLB, LLM, GDL) have distinct international fees
- **Correct 2025/26 international fees** (degree programs):
  - LLB (London): £17,550/year
  - LLB (non-London): £16,700/year
  - 2-year LLB Accelerated (London): £20,350/year
  - LLM: £17,000–£18,500/year
- **Action**: Separate SQE/short course records from degree programs and update degree fees

### 8. Buckinghamshire New University
- **Problem**: 8 courses have home fees (£9,250–£9,790)
- **Correct 2025/26 international fees**: £13,000–£15,150/year
- **Action**: Update all to £14,000 (typical avg)

### 9. Edge Hill University
- **Problem**: 3 courses have home fees (£9,790)
- **Correct 2025/26 international fees**: £13,500–£16,500/year
- **Action**: Update all 3 to £15,000

### 10. De Montfort University
- **Problem**: All 3 courses have home/wrong fees (£2,310 or £9,250)
- **Correct 2025/26 international fees**: £15,750–£16,250 UG, ~£16,000 PG
- **Action**: Update all to £16,000
- ⚠️ Currently INVISIBLE in search results (all fees ≤ £10,000)

### 11. Wrexham University
- **Problem**: All 6 courses have wrong fees (£1,000–£5,940)
- **Correct 2025/26 international fees**: £11,750 UG, £12,500 PG
- **Action**: Update UG to £11,750, PG to £12,500
- ⚠️ Currently INVISIBLE in search results (all fees ≤ £10,000)

### 12. York St John University
- **Problem**: 13 courses have wrong fees (£2,025–£2,027)
- **Correct 2025/26 international fees**: UG £13,750–£15,750/year, PG £10,300–£15,500/year
- **Action**: Update all PG to £13,000 avg
- ⚠️ Only 8 courses showing (the 13 wrong-fee ones are hidden)

### 13. University Centre Weston
- **Problem**: Only had 1 course left (SIGN UP FOR OPEN DAY at £9,570) — junk entry
- ⚠️ Currently INVISIBLE — no real courses in the database for this university

### 14. University of East London
- **Problem**: 1 course at £6,500 (wrong)
- **Correct 2025/26 international fee**: £15,560 UG, £13,920–£18,060 PG
- **Action**: Update the 1 course to £15,560 or £16,000

---

## How to Fix (When Admin Access Available)

Run this script with the Supabase **service_role** key:

```js
// scripts/fix-international-fees.mjs
// Replace SUPABASE_SERVICE_ROLE_KEY with the actual key from Supabase dashboard

const FIXES = [
  // { university: 'Name', level: 'Undergraduate'|null, maxFee: 9999, newFee: 16500 }
  { university: 'University of Sunderland', level: 'Undergraduate', maxFee: 10000, newFee: 16500 },
  { university: 'University of Sunderland', level: 'Postgraduate', maxFee: 10000, newFee: 17500 },
  { university: 'University of Greenwich', level: 'Undergraduate', maxFee: 10000, newFee: 17200 },
  { university: 'University of Greenwich', level: 'Postgraduate', maxFee: 10000, newFee: 18500 },
  { university: 'University of Central Lancashire', level: 'Undergraduate', maxFee: 10000, newFee: 15000 },
  { university: 'University of Central Lancashire', level: 'Postgraduate', maxFee: 10000, newFee: 16000 },
  { university: 'University of West London', level: 'Undergraduate', maxFee: 10000, newFee: 16700 },
  { university: 'University of West London', level: 'Postgraduate', maxFee: 10000, newFee: 18500 },
  { university: 'Middlesex University', level: null, maxFee: 10000, newFee: 17200 },
  { university: 'Leeds Trinity University', level: 'Undergraduate', maxFee: 10000, newFee: 12000 },
  { university: 'Leeds Trinity University', level: 'Postgraduate', maxFee: 10000, newFee: 13000 },
  { university: 'Buckinghamshire New University', level: null, maxFee: 10000, newFee: 14000 },
  { university: 'Edge Hill University', level: null, maxFee: 10000, newFee: 15000 },
  { university: 'De Montfort University', level: null, maxFee: 10000, newFee: 16000 },
  { university: 'Wrexham University', level: 'Undergraduate', maxFee: 10000, newFee: 11750 },
  { university: 'Wrexham University', level: 'Postgraduate', maxFee: 10000, newFee: 12500 },
  { university: 'York St John University', level: null, maxFee: 10000, newFee: 13000 },
  { university: 'University of East London', level: null, maxFee: 10000, newFee: 15560 },
];
```
