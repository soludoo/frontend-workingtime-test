'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useNetworkStatus } from '@/hooks/use-network-status';
import React from 'react';
import { toast } from 'sonner';

const Report = () => {
  const [value, setValue] = React.useState('');
  const [otherProblem, setOtherProblem] = React.useState('');
  const isOnline = useNetworkStatus();

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/settings/support/problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem_type: value,
          additional_details: otherProblem,
        }),
      });
      const { data } = await res.json();
      if (res.ok) {
        toast.success('Problem reported successfully!');
        setValue('');
        setOtherProblem('');
      } else {
        console.error('Failed to report problem:', data.message);
        toast.error('Failed to report problem. Please try again.');
      }
    } catch (error) {
      console.error('Error reporting problem:', error);
    }
  };

  return (
    <div className='flex flex-col gap-10 h-full justify-between p-5'>
      <div className='flex flex-col gap-4'>
        <RadioGroup
          value={value}
          onValueChange={(val) => isOnline && setValue(val)}
          className='gap-4'
          disabled={!isOnline}>
          <div className='flex items-center gap-3 justify-between'>
            <Label htmlFor='What are the different types of PTO?'>
              What are the different types of PTO?
            </Label>
            <RadioGroupItem
              value='What are the different types of PTO?'
              id='What are the different types of PTO?'
            />
          </div>
          <div className='border-b border-border w-full' />

          <div className='flex items-center gap-3 justify-between'>
            <Label htmlFor='How do I request vacation time?'>
              How do I request vacation time?
            </Label>
            <RadioGroupItem
              value='How do I request vacation time?'
              id='How do I request vacation time?'
            />
          </div>
          <div className='border-b border-border w-full' />

          <div className='flex items-center gap-3 justify-between'>
            <Label htmlFor='Where can I see my past requests?'>
              Where can I see my past requests?
            </Label>
            <RadioGroupItem
              value='Where can I see my past requests?'
              id='Where can I see my past requests?'
            />
          </div>
          <div className='border-b border-border w-full' />

          <div className='flex items-center gap-3 justify-between'>
            <Label htmlFor='How do I change or remove a request?'>
              How do I change or remove a request?
            </Label>
            <RadioGroupItem
              value='How do I change or remove a request?'
              id='How do I change or remove a request?'
            />
          </div>
          <div className='border-b border-border w-full' />
          <div className='flex items-center gap-3 justify-between'>
            <Label htmlFor='Where can I view my PTO balance?'>
              Where can I view my PTO balance?
            </Label>
            <RadioGroupItem
              value='Where can I view my PTO balance?'
              id='Where can I view my PTO balance?'
            />
          </div>
          <div className='border-b border-border w-full' />
          <div className='flex items-center gap-3 justify-between'>
            <Label htmlFor='Which holidays does NoviPlan observe?'>
              Which holidays does NoviPlan observe?
            </Label>
            <RadioGroupItem
              value='Which holidays does NoviPlan observe?'
              id='Which holidays does NoviPlan observe?'
            />
          </div>
          <div className='border-b border-border w-full' />
          <div className='flex items-center gap-3 justify-between'>
            <Label htmlFor='Who do I ask about my paycheck?'>
              Who do I ask about my paycheck?
            </Label>
            <RadioGroupItem
              value='Who do I ask about my paycheck?'
              id='Who do I ask about my paycheck?'
            />
          </div>
          <div className='border-b border-border w-full' />
          <div className='flex items-center gap-3 justify-between'>
            <Label htmlFor='other'>Other</Label>
            <RadioGroupItem value='other' id='other' />
          </div>
        </RadioGroup>
        {value === 'other' && (
          <div className='flex flex-col mt-3 gap-2'>
            <Label htmlFor='problem'>Type your problem</Label>
            <Textarea
              id='problem'
              placeholder='Write your problem here...'
              className='h-[120px]'
              value={otherProblem}
              onChange={(e) => setOtherProblem(e.target.value)}
            />
          </div>
        )}
      </div>
      <Button disabled={!value || !isOnline} onClick={handleSubmit}>
        {isOnline ? 'Submit' : 'Offline - Read Only'}
      </Button>
    </div>
  );
};

export default Report;
