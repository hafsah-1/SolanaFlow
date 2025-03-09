use anchor_lang::prelude::*;

declare_id!("7aRcaE86qinCaRVkTxAEbo9EVgJTs6iRXxUkk1KsGpcM");

#[program]
pub mod focus_timer {
    use super::*;

    pub fn start_timer(ctx: Context<StartTimer>, duration: u64) -> Result<()> {
        let timer = &mut ctx.accounts.timer;
        timer.owner = *ctx.accounts.user.key;
        timer.start_time = Clock::get()?.unix_timestamp as u64;
        timer.duration = duration;
        Ok(())
    }

    pub fn check_timer(ctx: Context<CheckTimer>) -> Result<bool> {
        let timer = &ctx.accounts.timer;
        let current_time = Clock::get()?.unix_timestamp as u64;
        Ok(current_time >= timer.start_time + timer.duration)
    }
}

#[derive(Accounts)]
pub struct StartTimer<'info> {
    #[account(init, payer = user, space = 8 + 40)]
    pub timer: Account<'info, Timer>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CheckTimer<'info> {
    #[account(has_one = owner)]
    pub timer: Account<'info, Timer>,
    pub owner: Signer<'info>,
}

#[account]
pub struct Timer {
    pub owner: Pubkey,
    pub start_time: u64,
    pub duration: u64,
}
npm 
