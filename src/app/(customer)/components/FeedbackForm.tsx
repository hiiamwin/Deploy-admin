import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function FeedbackForm() {
  return (
    <Card className="mx-4 lg:mx-40">
      <CardHeader>
        <CardTitle className="text-center">Để lại đánh giá của bạn</CardTitle>
        <CardDescription className="text-center">
          Những nhận xét và đánh giá của bạn giúp chúng tôi cải thiện chất lượng
          dịch vụ, xin cảm ơn!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label>Đánh giá</label>
              <RadioGroup
                className="flex space-x-4 flex-wrap md:flex-nowrap"
                required
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={value.toString()}
                      id={`rating-${value}`}
                    />
                    <label
                      htmlFor={`rating-${value}`}
                      className="flex items-center justify-center"
                    >
                      {value}
                      <svg
                        className={`w-4 h-4 text-yellow-400`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="comment">Nhận xét</label>
              <Textarea
                id="comment"
                placeholder="Nhận xét của bạn về chất lượng dịch vụ"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit">Gửi</Button>
      </CardFooter>
    </Card>
  );
}

export default FeedbackForm;
